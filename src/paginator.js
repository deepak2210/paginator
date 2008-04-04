var Paginator = Class.create({
  initialize: function(element) {
    this.container_element = $(element);
    this.items = this.container_element.immediateDescendants();
    this.page_size = 10;
    this.page_number = 1;
    
    var n = 0;
    this.items.each(function(i) {
      n++;
      if (n > this.page_size) i.hide();
    }.bind(this));
    
    this.pior_link = new Element('a', { href: '' }).update('Pior');
    Event.observe(this.pior_link, 'click', this._pior.bind(this));
    
    this.next_link = new Element('a', { href: '' }).update('Next');
    Event.observe(this.next_link, 'click', this._next.bind(this));
    
    this.container_element.insert({
      top: new Element('li', { 'class': 'pior' }).insert(this.pior_link)
    });
    
    this.next_element = this.container_element.insert({
      bottom: new Element('li', { 'class': 'next' }).insert(this.next_link)
    });
  },
  
  pior: function() {
    if (this.page_number == 1) return false;
    
    this.page_number--;

    var n = 0;
    var first_index = (this.page_size * (this.page_number - 1));
    var last_index = first_index + this.page_size - 1;
    this.items.each(function(i) {
      if (n < first_index || n > last_index) {
        i.hide();
      } else {
        i.show();
      }
      n++;
    }.bind(this));    
  },

  next: function() {
    this.page_number++;

    var n = 0;
    var first_index = (this.page_size * (this.page_number - 1));
    var last_index = first_index + this.page_size - 1;
    this.items.each(function(i) {
      if (n < first_index || n > last_index) {
        i.hide();
      } else {
        i.show();
      }
      n++;
    }.bind(this));    
  },
  
  _pior: function(ev) {
    try { this.pior(); } finally { ev.stop(); }
  },
  
  _next: function(ev) {
    try { this.next(); } finally { ev.stop(); }
  }

});


