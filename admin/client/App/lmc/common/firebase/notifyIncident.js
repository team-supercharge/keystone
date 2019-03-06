import Swal from 'sweetalert2'

const notifyIncident = (payload) => {
    const { carerName, residentName, itemName } = payload.data
    const title = payload.notification.title

    let text;
    if (itemName.match(/Fall/)) {
      text = `${residentName} has had a fall.`;
    }
    if (itemName.match(/Assault/)) {
      text = `${residentName} has been involved in an assault.`;
    }
    if (itemName.match(/Medication/)) {
      text = `${residentName} has had a medication error.`;
    }
    if (itemName.match(/Missing/)) {
      text = `${residentName} has been reported as missing.`;
    }
    if (itemName.match(/Injury/)) {
      text = `${residentName} has had an injury.`;
    }

    const html = `<p>${text}</p><p>Logged by: ${carerName}`

    Swal.fire({
        title,
        html,
        type: 'warning',
        confirmButtonClass: 'lmc-custom-notification-confirm',
    })
}

export default notifyIncident