var Paginator = Class.create({
  initialize: function(element) {
		this.page_size = 10;
		this.page_number = 1;
	
    this.container_element = $(element);
    this.items = this.container_element.immediateDescendants();
		
		// total pages
    this.last_page = parseInt(this.items.size() / this.page_size);
		if (this.items.size() % this.page_size) this.last_page++;

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

		this.page(1);
  },
  
  pior: function() {
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
			this.pior_link.addClassName('disabled');
		} else {
			this.pior_link.removeClassName('disabled');
		}

		if (this.page_number == this.last_page) { 
			this.next_link.addClassName('disabled');
		} else {
			this.next_link.removeClassName('disabled');
		}
	},
  
  _pior: function(ev) {
    try { this.pior(); } finally { ev.stop(); }
  },
  
  _next: function(ev) {
    try { this.next(); } finally { ev.stop(); }
  }

});