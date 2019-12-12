import "./index.scss";

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class AutoComplete {
  constructor(options) {
    this.selector = options.selector;
    this.data = options.data || {};
    this.searchKey = options.searchKey;
    this.pillTemplate = options.pillTemplate;
    this.clearOnSelection = options.clearOnSelection;
    this.suggestionTemplate = options.suggestionTemplate;
    this.placeHolder = options.placeHolder;
    this.onSelect = options.onSelect;

    this.cache = {};
    this.selectedResult = options.selectedResult || [];
    this.onItemSelect = this.onItemSelect.bind(this);
    this.onItemDeSelect = this.onItemDeSelect.bind(this);
    this.create();
  }

  create() {
    this.el = document.querySelector(this.selector);

    this.el.innerHTML = `
      <div class='multi-selector-wrapper'>
          <div class='multi-selected-options-wrapper'></div>
          <div class='multi-select-input-wrapper' tab-index="0">
              <input class='multi-select-input' placeholder="${this.placeHolder}"/>
              <div class='multi-select-suggestion'>
              </div>
          </div>
      </div>
      `;

    this.attachEvents();
    this.renderSuggestions();
    this.renderSelectedPills();
  }

  attachEvents() {
    this.el
      .querySelector(".multi-select-input")
      .addEventListener("keydown", this.onInputKeyHandle.bind(this));

    this.el
      .querySelector(".multi-select-input")
      .addEventListener("input", debounce(this.change.bind(this), 300));

    this.el
      .querySelector(".multi-select-input")
      .addEventListener("click", event => this.change(event));

    this.el
      .querySelector(".multi-select-input")
      .addEventListener("blur", () =>
        setTimeout(() => this.renderSuggestions(), 100)
      );
  }

  onInputKeyHandle(event) {
    if (event.keyCode === 8 && event.target.value.length === 0) {
      this.selectedResult.length = Math.max(0, this.selectedResult.length - 1);

      this.renderSelectedPills();
      if (this.onSelect) {
        this.onSelect({
          items: this.selectedResult
        });
      }
    }

    this.navigate(event);
  }

  onItemSelect(event) {
    const selectedValue = event.currentTarget.getAttribute("data-index");
    this.pickItem(selectedValue);
  }

  pickItem(selectedValue) {
    if (
      !this.selectedResult.some(
        _ => _[this.searchKey].toLowerCase() === selectedValue.toLowerCase()
      )
    ) {
      this.selectedResult.push(
        this.data.find(
          _ => _[this.searchKey].toLowerCase() === selectedValue.toLowerCase()
        )
      );
    }

    this.renderSelectedPills();

    if (this.clearOnSelection) {
      // Hide the suggestions
      this.renderSuggestions();
      this.el.querySelector("input").value = "";
      this.el.querySelector("input").focus();
    }

    if (this.onSelect) {
      this.onSelect({
        items: this.selectedResult
      });
    }
  }

  onItemDeSelect(event) {
    const selectedValue = event.currentTarget.getAttribute("data-index");
    const indexToBeDeleted = this.selectedResult.findIndex(
      _ => _[this.searchKey].toLowerCase() === selectedValue.toLowerCase()
    );
    this.selectedResult[indexToBeDeleted] = null;
    this.selectedResult = this.selectedResult.filter(Boolean);
    this.renderSelectedPills();

    if (this.onSelect) {
      this.onSelect({
        items: this.selectedResult
      });
    }
  }

  renderSelectedPills() {
    const { selectedResult, pillTemplate, searchKey } = this;
    const pillsHolder = this.el.querySelector(
      ".multi-selected-options-wrapper"
    );

    pillsHolder.innerHTML = "";
    selectedResult.map((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = pillTemplate(item, index);
      pillsHolder.appendChild(itemDiv);
      itemDiv.onclick = this.onItemDeSelect;
      itemDiv.setAttribute("data-index", item[searchKey]);
    });
  }

  navigate(event) {
    console.log(this.selectedItemIndex);
    let index = this.selectedItemIndex;
    let previousIndex = index;

    switch (event.keyCode) {
      case 38:
        index = +index - 1;
        break;
      case 40:
        index = +index + 1;
        break;
      case 13:
        this.pickItem(
          [...this.el.querySelector(".multi-select-suggestion").children][
            index
          ].getAttribute("data-index")
        );
        return;
    }

    index = Math.max(0, index);
    index = Math.min(index, this.performSearch(event.target.value).length - 1);

    this.selectedItemIndex = index;

    // update the UI
    const children = [
      ...this.el.querySelector(".multi-select-suggestion").children
    ];

    if (children && children[previousIndex]) {
      children[previousIndex].children[0].classList.remove("item-focus");
    }

    if (children && children[index]) {
      children[index].children[0].classList.add("item-focus");
    }
  }

  change(event) {
    const matchedResults = this.performSearch(event.target.value);
    this.renderSuggestions(matchedResults);
  }

  detachEventsToSearchedItems() {
    const itemsToBeDeleted = [
      ...this.el.querySelector(".multi-select-suggestion").children
    ];
    itemsToBeDeleted.map(_ =>
      _.removeEventListener("click", this.onItemSelect)
    );
  }

  updateData(data) {
    this.data = data || [];
    this.cache = {}; // burst the cache for new data
  }

  renderSuggestions(matchedResults) {
    this.selectedItemIndex = -1;
    this.detachEventsToSearchedItems();

    const suggestionHolder = this.el.querySelector(".multi-select-suggestion");
    const { suggestionTemplate, searchKey } = this;

    suggestionHolder.innerHTML = "";

    if (matchedResults) {
      suggestionHolder.style.display = "block";
      matchedResults.map((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = suggestionTemplate(item, index);
        suggestionHolder.appendChild(itemDiv);
        itemDiv.onclick = this.onItemSelect;
        itemDiv.setAttribute("data-index", item[searchKey]);
      }, "");

      if (matchedResults.length === 0) {
        suggestionHolder.innerHTML = "No Match Found";
      }
    } else {
      suggestionHolder.style.display = "none";
    }

    suggestionHolder.style.left = this.el.querySelector(
      ".multi-select-input"
    ).offsetLeft;
    suggestionHolder.style.top = this.el.querySelector(
        ".multi-select-input"
      ).getBoundingClientRect().height;
  }

  performSearch(searchText) {
    const { data, searchKey, cache } = this;

    if (searchText === "") {
      return data;
    }

    if (cache[searchText]) {
      return cache[searchText];
    }

    cache[searchText] = data.filter(
      _ => _[searchKey].toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );

    return cache[searchText];
  }
}

export default AutoComplete;
