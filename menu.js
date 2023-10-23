document.addEventListener('DOMContentLoaded', function() {
    const nombre1 = document.getElementById('name1');
    const nombre2 = document.getElementById('name2');
    const btn = document.getElementById('btn');

    console.log('hola');
    btn.onclick = getNombre{
        console.log('nombre: ', nombre1.value);
        console.log('nombre: ', nombre2.value);
    }
    
    function getNombre()
    {
        if(nombre1.value === ''||nombre2.value==='')
        {
            alert('Pone los nombres');
        }
        else
        {

        }
    }
});