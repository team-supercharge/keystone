import Swal from 'sweetalert2'

export const notifyIncident = (payload) => {
    const { carerName, residentName, itemName } = payload.data
    const title = payload.notification.title

    let text
    if (itemName.match(/ABC/)) {
      text = `${residentName} has had an antisocial incident.`
    }
    if (itemName.match(/Fall/)) {
      text = `${residentName} has had a fall.`
    }
    if (itemName.match(/Assault/)) {
      text = `${residentName} has been involved in an assault.`
    }
    if (itemName.match(/Medication/)) {
      text = `${residentName} has had a medication error.`
    }
    if (itemName.match(/Missing/)) {
      text = `${residentName} has been reported as missing.`
    }
    if (itemName.match(/Illness/)) {
      text = `${residentName} has been reported as ill.`
    }
    if (itemName.match(/Injury/)) {I
      text = `${residentName} has had an injury.`
    }

    const html = `<p>${text}</p><p>Logged by: ${carerName}`

    Swal.fire({
        title,
        html,
        type: 'warning',
        confirmButtonClass: 'lmc-custom-notification-confirm',
    })
}