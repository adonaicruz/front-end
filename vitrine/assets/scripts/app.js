
var productListWidth = 0;
var productListPosition = 0;
function X(response){
    
    var recommendations = response.data.recommendation;
    var referenceData = response.data.reference.item;
    var eReference = document.getElementById("reference");
    var eCarousel = document.querySelector("#carousel .items");
    var carouselNext = document.querySelector(".nav.next");
    var carouselPrev = document.querySelector(".nav.prev");

    eReference.innerHTML = createProduct(referenceData);

    recommendations.forEach(function(data){
        var product = document.createElement("div");
        product.classList.add('product')
        eCarousel.appendChild(product);
        product.innerHTML = createProduct(data);
        productListWidth += 190;
        eCarousel.style.width = productListWidth+"px";
    });

    carouselNext.onclick = function() {
        
        if(Math.abs(productListPosition) > productListWidth - document.querySelector("#carousel").clientWidth){
            load();
        }
            productListPosition -= 190;
            eCarousel.style.left = productListPosition+"px";
        
        
    }
    carouselPrev.onclick = function() {
        if(productListPosition < 0){
            productListPosition += 190;
            eCarousel.style.left = productListPosition+"px";
            
        }
        
    }
    
}

function createProduct(data){
    var html = '<img src="'+data.imageName+'" alt="">';
    html += '<p><a href="'+data.detailUrl+'" target="_blank">'+data.name+'</a></p>';
    html += '<div class="price"><a href="'+data.detailUrl+'" target="_blank">';
    if(data.oldPrice){
        html += '<span class="price_old">de: '+data.oldPrice+'</span>';
    }
    html += '<span class="price_new">por: <strong>'+data.price+'</strong></span>';
    html += '<span class="price_payment">'+data.productInfo.paymentConditions+'</span>';
    html += '<small>sem juros</small>';
    html += '</a></div>';
    return html;
}
function load(){
    var script = document.createElement('script');
    script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X'; 
    document.getElementsByTagName('head')[0].appendChild(script);
}
load();

