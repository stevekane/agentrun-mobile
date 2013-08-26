window.App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({
  init: function () {
    this._super.apply(this, arguments);
    this.set('contacts', [
      Ember.Object.create({id:1, firstName: "Tod", lastName: "Stevens"}), 
      Ember.Object.create({id:2, firstName: "Billy", lastName: "Thornton"}), 
      Ember.Object.create({id:3, firstName: "Jesse", lastName: "Ventura"}), 
      Ember.Object.create({id:4, firstName: "Michael", lastName: "Jaxxon"}), 
    ]);
  }
});
