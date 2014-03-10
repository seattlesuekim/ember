App = Ember.Application.create();

App.Router.map(function() {
    this.resource('about');
    this.resource('posts', function() {
        this.resource('post', {path: ':post_id' });
    });
});

App.PostsRoute = Ember.Route.extend({
    model: function() {
        return posts;
    }
});

App.PostRoute = Ember.Route.extend({
    model: function(params) {
        return posts.findBy('id', params.post_id);
    }
});

var posts = [{
    id: '1',
    title: "title1 title1 title1",
    author: {name: "sue"},
    date: new Date('12-27-2012'),
    excerpt: "Excerpt Excerpt",
    body: "body1 body1 body1"
},{
    id: '2',
    title: "Title2",
    author: {name: "Сью"},
    date: new Date('12-24-2012'),
    excerpt: "Excerpt2! ",
    body: "body2 body2"
}];

App.PostController = Ember.ObjectController.extend({
    isEditing: false,

    edit: function() {
        this.set('isEditing', true);
    },

    doneEditing: function() {
        this.set('isEditing', false);
        this.get('store').commit();
    }
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
});
