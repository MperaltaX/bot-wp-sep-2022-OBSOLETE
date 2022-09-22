const fetch = require('node-fetch')

const {get, reply, getIA} = require('../adapter')
const {saveExternalFile, checkIsUrl} = require('./handle')

const getMessages = async (message) => {
    const data = await get(message)
    return data
}

const responseMessages = async (step) => {
    const data = await reply(step)
    if(data && data.media){
        const file = checkIsUrl(data.media) ? await saveExternalFile(data.media) : data.media;
        return {...data,...{media:file}}
    }
    console.log(step);
    if(step == "STEP_10"){
        console.log('ES IGUAL A 10');
    } else {
        console.log('NO ES IGUAL A 10');
    }
    return data
}

const bothResponse = async (message) => {
    const data = await getIA(message)
    if(data && data.media){
        const file = await saveExternalFile(data.media)
        return {...data,...{media:file}}
    }
    return data
}

//----------Función para enviar POST----------------

function solicitudMoto(idCliente, idCajero, idSucursal, idDireccion, referencia, lt, lg, ltE, lgE, contactoE, costoEntrega, costoTotal){
    const datos = {
                    'idCliente': idCliente, //'233302',
                    'idCajero': idCajero, //'100000',
                    'transaccion': '0.0',
                    'idHashtag': '0',
                    'descuento': '0',
                    'aCobrar': '0',
                    'descontado': '0',
                    'cash': '0',
                    'idCash': '0',
                    'idCupon': '',
                    'idFormaPago': '10',
                    'cupon': '0',
                    'credito': '0',
                    'creditoProducto': '0',
                    'creditoEnvio': '0',
                    'token': 'e-4ZwI-fRa2mw6CYIptQoi:APA91bERKD_QEwhBnJY5wyBXkT8S0ph-1DctcRFAdbG9ryRF676KCgS5oRi_YEKM7Dqt9JLx-fhnC1tTX2V2qJIhI6XWS6G5dwVM10yjyYxzcgOpQF0MW2C0w53eAs9pVxjjUMfhmjII',
                    'type': '4',
                    'idSucursal': idSucursal, //'1',
                    'idDireccion': idDireccion, //'282',
                    'referencia': referencia, //'Yendo Prueba',
                    'lt': lt,//'-37.45944',
                    'lg': lg,//'-61.93453',
                    'costoEntrega': costoEntrega,//'0',
                    'tipo': '2',
                    'ltE': ltE, //'-37.48853',
                    'lgE': lgE, //'-61.94489',
                    'contactoE': contactoE, //'Alias Dirección',
                    'auth': 'WG61CA@632W@2/T6@/E&2KU2EI4PF57E3JDUVAX&O&P1&JIPMG@NUXN1WI--OTNOIZ--BLW2TF-*L&O41RB',
                    'idFactura': '0',
                    'factura': '0',
                    'promociones': '0',
                    'costo': '0',
                    'costoTotal': costoTotal //'0'
            }
    fetch('http://168.181.184.240/compraMp/inciar',{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-type': 'application/json',
                'idaplicativo': '1000001',
                'vs': '0.0.6',
                'idplataforma': '1',
                'system': 'android',
                'marca': 'samsung',
                'modelo': 'MMB29TG532MUMS1ARJC',
                'so': '23',
                'iph': 'true',
                'red': 'x',
                'referencia': '12.03.91',
                'imei': '149e2905fed27c5656b0e48aab99e58f',
                'key': '10a24eb878ea56986ebb2a715c12f3ad',
            } 
    }).then(response => response.json())
    .then(json => console.log(json));

}

module.exports = { getMessages, responseMessages, bothResponse }