import './sass/main.scss';
import { getImages } from './js/apiService';
import imagesList from './templates/image_temp.hbs';
import * as basicLightbox from 'basiclightbox';

////////////////////////////////////////////////////////////////////////////////////


let searchValue = '';
let pageNumber = 1;
const key = '24190237-c75eaa2cb0fd0521e8d3d1887';



const queryselectors = {
    searchEl: document.querySelector('.search-button'),
    ingListRef: document.querySelector('.gallery'),
    button_moreload: document.querySelector('.button_moreload'),
    upBtn: document.querySelector('.button_upper'),
    svg: document.querySelector('.main-animation'),
    inputArea:document.querySelector('.input-area'),
};

/////////////////////////////////////////////////////////////////////////////////////

queryselectors.searchEl.addEventListener('click', getFormTextContent);
queryselectors.inputArea.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
        getFormTextContent();
    }
});

queryselectors.button_moreload.addEventListener('click', overLoad);
queryselectors.upBtn.addEventListener('click', () => upperBtn(element2));

function getFormTextContent() {
    pageNumber = 1;
    searchValue = queryselectors.searchEl.previousElementSibling.value;
    queryselectors.ingListRef.innerHTML = ``;
    
    getImages(searchValue, pageNumber, key).then(o => {
        markupBeforeend(o.hits);
        if (o.hits.length >= 1) queryselectors.svg.classList.add('visually-hidden');
        if (o.hits.length > 11) {
            queryselectors.button_moreload.classList.remove('visually-hidden');
            queryselectors.upBtn.classList.remove('visually-hidden');
        }
    })      
}

function overLoad() {
 
    getImages(searchValue, ++pageNumber, key)
        .then(o => markupBeforeend(o.hits))
        .then(() => upperBtn(queryselectors.ingListRef.children[queryselectors.ingListRef.children.length - 12])
)}

function markupBeforeend(data) { 
    if (data.length > 0) {
            const imagesMarkup = createMarkup(data, imagesList);
            queryselectors.ingListRef.insertAdjacentHTML('beforeend', imagesMarkup);
    }
    else {
            queryselectors.button_moreload.classList.add('visually-hidden');
    }
}



const element2 = document.getElementById('search-form');

function upperBtn(el) { 
  el.scrollIntoView({
  behavior: 'smooth',
  block: 'start',
});
}

function createMarkup(data,template) {
            return data.map(template).join('');
}
        

queryselectors.ingListRef.addEventListener("click",zoomImage);

function zoomImage(event) {
  if(event.target.localName=='img'){
    const instance = basicLightbox.create(`
    <img src="${event.target.srcset}" width="800" height="600">
`)
instance.show()
  } 
}

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 10);
}