const resultBlock = $('#result');
const moreInfoBlock = $('.aside');
let pageNumber = 1;

getImages(pageNumber);
checkActivePage(pageNumber);

$('.aside__info').hide();

$('.page-number-btn').on('click', function(e) {
    let pageNumber = $(this).data('page');
    getImages(pageNumber);
    checkActivePage(pageNumber)
})
$(document).on('click', '.result__item-btn', function()  {
    const imgDescription = $(this).data('description')
          imgThumb = $(this).data('thumb')
          imgFull = $(this).data('imgfull')
          imgCreated = $(this).data('created')
          imgUpdated = $(this).data('updated')
    $('.aside__info').show();
    $('.aside__empty').hide();
    $('.aside__full').attr('href', imgFull);
    $('.aside__img').attr('src', imgThumb);
    $('.aside__description').text(imgDescription);
    $('.aside__created').text(imgCreated);
    $('.aside__updated').text(imgUpdated);
})

function checkActivePage(pageNumber) {
    $('.page-number-btn').removeClass('active');
    $(`.page-number-btn[data-page=${pageNumber}]`).addClass('active');
}

function getImages(pageNumber) {
    $.ajax(`https://api.unsplash.com/photos/?client_id=Sm6RuPoLbbx5HrgoYfJcANgYPBit-xoqikUDnHRLf2I&page=${pageNumber}`, {
        success: function(data) {
            resultBlock.empty();
            data.forEach(el => {
                const img = `<div class="result__item">
                                <img class="result__item-img" src="${el.urls.small}" alt="${el.alt_description}">
                                <button class="result__item-btn" 
                                    data-thumb="${el.urls.regular}" 
                                    data-description="${el.alt_description}" 
                                    data-imgfull="${el.links.download}"
                                    data-created="${el.created_at}"
                                    data-updated="${el.updated_at}"
                                >More info...</button>
                             </div>`;
                resultBlock.append(img);
            });
        }
    });
}



