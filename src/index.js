import './sass/main.scss';
import { getImages } from './js/apiService';
// import { debounce, times } from 'lodash';
import imagesList from './templates/image_temp.hbs';
import * as basicLightbox from 'basiclightbox'

const searchData = {
    key: '24190237-c75eaa2cb0fd0521e8d3d1887',
    pageNumber: 1,
    searchValue: '', 
}

const queryselectors = {
    searchEl: document.querySelector('.search-button'),
    ingListRef: document.querySelector('.gallery'),
    button_moreload: document.querySelector('.button_moreload'),
    upBtn: document.querySelector('.button_upper'),
    svg: document.querySelector('.svg'),
    inputArea:document.querySelector('.input-area'),
};

queryselectors.searchEl.addEventListener('click', getFormTextContent);
queryselectors.inputArea.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        getFormTextContent()
    }
});
queryselectors.button_moreload.addEventListener('click', overLoad);
queryselectors.upBtn.addEventListener('click', () => upperBtn(element2));

function getFormTextContent() {
    searchData.pageNumber = 1;
    searchData.searchValue = queryselectors.searchEl.previousElementSibling.value;
    
    const API = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchData.searchValue}&page=${searchData.pageNumber}&per_page=12&key=${searchData.key}`;
    
    queryselectors.ingListRef.innerHTML=``;
    getImages(API).then(o => {
        markupBeforeend(o.hits);
        if (o.hits.length >= 1) queryselectors.svg.classList.add('visually-hidden');
        if (o.hits.length > 11) {
            queryselectors.button_moreload.classList.remove('visually-hidden');
            queryselectors.upBtn.classList.remove('visually-hidden');
        }
    })
        
}

function overLoad() {
    searchData.pageNumber = searchData.pageNumber + 1;
   
    const API = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchData.searchValue}&page=${searchData.pageNumber}&per_page=12&key=${searchData.key}`;

    getImages(API).then(o => markupBeforeend(o.hits))
        .then(()=>upperBtn(element)
)}

function markupBeforeend(data) {
    if (data.length > 0) {
            const imagesMarkup = createMarkup(data, imagesList);
            queryselectors.ingListRef.insertAdjacentHTML('beforeend', imagesMarkup);
        }
}

const element = document.getElementById('anchor');
const element2 = document.getElementById('search-form');

function upperBtn(el) { 
  el.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}

function createMarkup(data,template) {
            return data.map(template).join('');
}
        

queryselectors.ingListRef.addEventListener("click", clickImage);

function clickImage(event) {
  if(event.target==="IMG"){
    const instance = basicLightbox.create(`
    <img src="${event.target.srcset}" width="800" height="600">
`)
instance.show()
  }
}

