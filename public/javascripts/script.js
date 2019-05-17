function getCategories() {
    var id = JSON.parse(document.getElementById("sites").value).id;
    console.log(id);
    let request = new XMLHttpRequest();
    var url = 'https://api.mercadolibre.com/sites/' + id;
    console.log(url)
    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {

            var option = document.createElement("option");
            option.value = '';
            option.text = 'Elija Categoria';
            list.appendChild(option);
            data.categories.forEach(category => {
                var option = document.createElement("option");
                option.value = category.id;
                option.text = category.name;
                list.appendChild(option);
            });
        }
    }
    request.send();
}


function showCategory(siteId) {
    window.location.replace('categories/'+siteId);
}
