var Paginator = Class.create({
  initialize: function(element) {
    this.page_size = 10;
  
    this.container_element = $(element);
    this.items = this.container_element.immediateDescendants();

    this.page_number = 1;
    this.items.each(function(e, i) {
      if (e.hasClassName('selected')) {
        this.page_number = this._parsePageNumber(i + 1, this.page_size);
      }
    }.bind(this));
    
    // total pages
    this.last_page = this._parsePageNumber(this.items.size(), this.page_size);

    this.prior_link = new Element('a', { href: '' }).update('Prior');
    Event.observe(this.prior_link, 'click', this._prior.bind(this));
    
    this.next_link = new Element('a', { href: '' }).update('Next');
    Event.observe(this.next_link, 'click', this._next.bind(this));
    
    this.container_element.insert({
      top: new Element('li', { 'class': 'prior' }).insert(this.prior_link)
    });
    
    this.next_element = this.container_element.insert({
      bottom: new Element('li', { 'class': 'next' }).insert(this.next_link)
    });

    this.page(this.page_number);
  },
  
  prior: function() {
    return this.page(this.page_number - 1);
  },

  next: function() {
    this.page(this.page_number + 1);
  },

  page: function(number) {
    if (number < 1) return false;
    if (number > this.last_page) return false;

    this.page_number = number;
    var n = 0;
    var first_index = (this.page_size * (this.page_number - 1));
    var last_index = first_index + this.page_size - 1;
    
    this._checkBoundaries();

    this.items.each(function(i) {
      if (n < first_index || n > last_index) {
        i.hide();
      } else {
        i.show();
      }
      n++;
    }.bind(this));    

    return true;
  },

  _checkBoundaries: function() {
    if (this.page_number == 1) { 
      this.prior_link.addClassName('disabled');
    } else {
      this.prior_link.removeClassName('disabled');
    }

    if (this.page_number == this.last_page) { 
      this.next_link.addClassName('disabled');
    } else {
      this.next_link.removeClassName('disabled');
    }
  },
  
  _prior: function(ev) {
    try { this.prior(); } finally { ev.stop(); }
  },
  
  _next: function(ev) {
    try { this.next(); } finally { ev.stop(); }
  },

  _parsePageNumber: function(items_count, items_per_page) {
    var page_number = parseInt(items_count / items_per_page);
    if (items_per_page % items_count) page_number++;
    return page_number;
  }

});