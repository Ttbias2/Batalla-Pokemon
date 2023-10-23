document.addEventListener('DOMContentLoaded', function() {
    const nombre1 = document.getElementById('name1');
    const nombre2 = document.getElementById('name2');
    const btn = document.getElementById('btn');

    //console.log('hola');
    btn.onclick = getNombre;
    
    function getNombre()
    {
        if(nombre1.value === ''||nombre2.value==='')
        {
            alert('Pone los nombres');
        }
        else
        {
            console.log(nombre1.value+' '+nombre2.value);
        }
    }
});