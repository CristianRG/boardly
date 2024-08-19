// const alert = {
//     type: 'info',
//     //title: 'simon',
//     message: 'Example to info alert',
//     actions: [
//         {
//             label: 'Aceptar',
//             style: 'btn-success',
//             action: () => {
//                 console.log('Confirm action')
//             }
//         },
//         {
//             label: 'Cancelar',
//             style: 'btn-danger',
//             action: () => {
//                 console.log('Cancel action')
//             }
//         }

//     ]
// }

class Alert {
    constructor(type, title, message, actions) {
        this.type = type
        this.title = title
        this.message = message
        this.actions = actions ? actions : []
        this.types = {
            info: 'info',
            success: 'success',
            warning: 'warning',
            error: 'error',
        }
        this.styles = {
            btnSuccess: 'btn-success',
            btnDanger: 'btn-danger',
            btnWarning: 'btn-warning',
        }
    }

    static action(label, style, action){
        return {
            label,
            style,
            action,
        }
    }
}

export default Alert