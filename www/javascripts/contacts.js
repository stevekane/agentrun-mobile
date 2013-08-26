window.App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({});

App.Router.map(function () {
  this.resource('contact', {path: '/contacts/:contact_id'});
});

App.IndexRoute = Ember.Route.extend({

  setupController: function (controller) {
    var contacts = Em.A();

    $.getJSON('contacts.json', function (data) {
      data.contacts.forEach(function (newContact) {
        contacts.pushObject(Ember.Object.create(newContact));
      });
      controller.set('contacts', contacts); 
    });
  }
});

App.IndexView = Ember.View.extend({
  init: function () {
    this._super.apply(this, arguments); 
    this.set("active", true);
  }
});

App.ContactView = Ember.View.extend({

  init: function () {
    this._super.apply(this, arguments); 
    this.set("boundShowContacts", this.showContacts.bind(this));
    this.set("active", true);
  },

  //ATTACH EVENT LISTENER
  didInsertElement: function () {
    var element = this.get('element')
      , that = this;

    Hammer(element).on('swipeleft', that.boundShowContacts);
  },

  //REMOVE EVENT LISTENER
  willRemoveElement: function () {
    var element = this.get('element') 
      , that = this;

    Hammer(element).off('swipeleft', that.boundShowContacts);
  },

  //PLAY ANIMATION AND TRANSITION
  showContacts: function () {
    var that = this
      , controller = this.get('controller')
      , animation = new steroids.Animation({transition: "slideFromRight"}); 

    this.set('active', false);
    Ember.run.next(this, function () {
      animation.perform({
        duration: "0.2",
        curve: "linear"
      }, {
        onSuccess: function () { controller.transitionToRoute("index"); }
      });
    });
  }

});

App.ContactListItemView = Ember.View.extend({

  init: function () {
    this._super.apply(this, arguments); 
    this.set("boundShowContact", this.showContact.bind(this));
  },

  //ATTACH EVENT LISTENER
  didInsertElement: function () {
    var element = this.get('element')
      , that = this;

    Hammer(element).on('tap', that.boundShowContact);
  },

  //REMOVE EVENT LISTENER
  willRemoveElement: function () {
    var element = this.get('element') 
      , that = this;

    Hammer(element).off('tap', that.boundShowContact);
  },

  //PLAY ANIMATION AND TRANSITION
  showContact: function () {
    var that = this
      , contact = this.get('content')
      , controller = this.get('controller')
      , parentView = this.get('parentView')
      , animation = new steroids.Animation({transition: "slideFromLeft"}); 

    parentView.set('active', false);
    Ember.run.next(this, function () {
      animation.perform({
        duration: "0.2",
        curve: "linear"
      }, {
        onSuccess: function () { controller.transitionToRoute("contact", contact); }
      });
    });
  }
});
