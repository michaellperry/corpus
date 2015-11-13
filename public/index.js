var j = new Jinaga();
j.sync(new JinagaDistributor("ws://jinaga.cloudapp.net"));

var user = ko.observable();
j.login(function (u) {
    if (!u)
        window.location = "http://jinaga.cloudapp.net/login";
    else
        user(u);
});

var viewModel = function() {
    function userIdentity() {
        if (!user())
            return "";
        return user().publicKey;
    }
    return {
        name: "Corpus",
        identity: ko.computed(userIdentity)
    };
}();

ko.applyBindings(viewModel);
