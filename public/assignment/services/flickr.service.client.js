(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var api = {
            searchPhotos : searchPhotos
        };

        return api;

        function searchPhotos(searchText) {
            var key = "64ef18cfffce6a305f476573982623c2";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();