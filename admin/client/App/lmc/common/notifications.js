import Swal from 'sweetalert2'

export const showProAlert = (component) => {
    Swal.fire({
        title: 'Whoops!',
        html: 'You need to enable PRO mode to access this feature.<br>For more information, <a href="https://logmycare.co.uk/pricing/" target="_blank">click here.</a>',
        type: 'info',
        confirmButtonClass: 'lmc-custom-notification-confirm',
        onClose: () => component.props.router.goBack()
    })
}