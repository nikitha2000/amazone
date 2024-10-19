const sortButton = document.getElementById('sortButton');
const popUp = document.getElementById('popUp');

sortButton.addEventListener('click',function(event)  {
  popUp.style.display = 'block';
  event.stopPropagation()
})

document.addEventListener('click', function() {
    popUp.style.display = 'none';
 });
//-----------------------------------------------------------------------------------
 const poplnks = document.querySelectorAll('.drpdwn-lnk');
 const featured = document.querySelector('.featured')

 poplnks.forEach(poplnk => {
    poplnk.addEventListener('click', function() {
        poplnks.forEach(link => link.classList.remove('active'))
        poplnk.classList.add = 'active';

        featured.innerHTML = '';
        featured.innerHTML = poplnk.innerHTML;
    })
 })

 //---------------------------------------------------------------------------------------------------------
       
 