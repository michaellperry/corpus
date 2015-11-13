var j = new Jinaga();
j.sync(new JinagaDistributor("ws://jinaga.cloudapp.net"));

function ko_watch_array(obs, templates, array) {
    var watch = null;
    function added(i) {
        array.push(i);
    }
    function removed(i) {
        array.remove(i);
    }
    obs.subscribe(function (value) {
        if (watch) {
            watch.stop();
            watch = null;
        }
        array.removeAll();
        if (value) {
            watch = j.watch(value, templates, added, removed);
        }
    })
}

function ko_watch_array_readonly(value, templates, array) {
    //var watch = null;
    //if (watch) {
    //    watch.stop();
    //    watch = null;
    //}
    function added(i) {
        array.push(i);
    }
    function removed(i) {
        array.remove(i);
    }
    array.removeAll();
    if (value) {
        //watch =
            j.watch(value, templates, added, removed);
    }
}

function ko_value_of(obs) {
    return ko.computed(function () {
        var array = obs();
        if (array.length)
            return array[0].value;
        else
            return null;
    });
}

var viewModel = function() {
    var user = ko.observable();
    j.login(function (u) {
        if (!u)
            window.location = "http://jinaga.cloudapp.net/login";
        else
            user(u);
    });

    var podcasts = ko.observableArray();
    function podcastsFromUser(u) {
        return {
            type: "Corpus.Podcast",
            from: u
        };
    }
    ko_watch_array(user, [podcastsFromUser], podcasts);

    function podcastViewModel(podcast) {
        var names = ko.observableArray();

        function isCurrent(n) {
            return j.not({
                type: "Corpus.Podcast.Name",
                prior: n
            });
        }
        function namesForPodcast(p) {
            return j.where({
                type: "Corpus.Podcast.Name",
                in: p
            }, [isCurrent]);
        }
        ko_watch_array_readonly(podcast, [namesForPodcast], names);

        return {
            name: ko_value_of(names)
        }
    }
    var selectedPodcast = ko.observable();

    return {
        podcasts: ko.computed(function () {
            var array = podcasts();
            var children = array.map(podcastViewModel);
            return children;
        }),
        selectedPodcast: selectedPodcast
    };
}();

ko.applyBindings(viewModel);
