// Copyright © 2008 Jose Peleteiro
//  
// Permission to use, copy, modify, distribute, and sell this software and its
// documentation for any purpose is hereby granted without fee, provided that
// the above copyright notice appear in all copies and that both that
// copyright notice and this permission notice appear in supporting
// documentation, and that the name of the Authors not be used in advertising or
// publicity pertaining to distribution of the software without specific,
// written prior permission. The Authors makes no representations about the
// suitability of this software for any purpose.  It is provided "as is"
// without express or implied warranty.
//  
// The AUTHORS DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING ALL
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS, IN NO EVENT SHALL SuSE
// BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
// OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
// CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

var Paginator = Class.create({

  initialize: function(element, options) {
    this.container_element = $(element);
    this.options = Object.extend(Object.extend({ },Paginator.DefaultOptions), options || { });
    
    this.items = this.container_element.immediateDescendants();
    this.page_number = this.selectedItemPage();
    this.last_page = this._parsePageNumber(this.items.size(), this.options.page_size);

    this._addNavigationElements();

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
    var first_index = (this.options.page_size * (this.page_number - 1));
    var last_index = first_index + this.options.page_size - 1;
    
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
  
  selectedItemPage: function() {
    var result = 1;
    this.items.each(function(e, i) { 
      if (e.hasClassName('selected')) {
        result = this._parsePageNumber(i + 1, this.options.page_size);
      }
    }.bind(this));    
    return result;
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
  },
  
  _addNavigationElements: function() {
    this.prior_link = new Element('a', { href: '' }).update(this.options.prior_label);
    Event.observe(this.prior_link, 'click', this._prior.bind(this));

    this.container_element.insert({
      top: new Element('li', { 'class': 'prior' }).insert(this.prior_link)
    });
        
    this.next_link = new Element('a', { href: '' }).update(this.options.next_label);
    Event.observe(this.next_link, 'click', this._next.bind(this));
    
    this.next_element = this.container_element.insert({
      bottom: new Element('li', { 'class': 'next' }).insert(this.next_link)
    });    
  }

});

Paginator.DefaultOptions = {
  page_size: 10,
  next_label: '&gt;&gt;',
  prior_label: '&lt;&lt;'
}