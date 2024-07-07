//this is for know if the user is search something 
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('search');
    const containerSearch = document.getElementById('container-search');
    const containerHome= document.getElementById('container-home');
    const adCarousel=document.getElementById('ad-carousel');

    searchInput.addEventListener('focus', function() {
        on_search()
    });

    searchInput.addEventListener('input', function() {
        on_search()
    });

    searchInput.addEventListener('blur', function() {
        off_search();
    });


    function on_search(){
        if (containerSearch.classList.contains('hidden')) {
            containerSearch.classList.remove('hidden');
        }

        if (!containerHome.classList.contains('hidden')) {
            containerHome.classList.add('hidden');
        }

        if(!adCarousel.classList.contains('hidden')){
            adCarousel.classList.add('hidden');
        }
    }

    function off_search(){
        //we will see if the user not have a search in the seeker 
        if (searchInput.value.trim() !== '') {
            return
        }

        //if the user not have a search in the seeker, we will to deactivate the seeker
        if (!containerSearch.classList.contains('hidden')) {
            containerSearch.classList.add('hidden');
        }

        if (containerHome.classList.contains('hidden')) {
            containerHome.classList.remove('hidden');
        }

        if(adCarousel.classList.contains('hidden')){
            adCarousel.classList.remove('hidden');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchHistory = document.getElementById('search-history');
    const historyItems = searchHistory.getElementsByTagName('li');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() !== '') {
            Array.from(historyItems).forEach(item => {
                const text = item.textContent.toLowerCase();
                
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }else{
            Array.from(historyItems).forEach(item => {
                item.style.display = '';
            });
        }
    });
});