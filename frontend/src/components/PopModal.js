import toggleDisplay from '../components/toggleDisplay'
export default function PopModal(ID) {
    switch (ID) {
        case 'bio':
            toggleDisplay('BioEditModal');
            console.log("bio");
            break;
        //and populate
        case 'timeline':
            toggleDisplay('TimelineEditor');
            //and populate
            console.log("timeline");
            break;
        default:
            console.log("Invalid 'toggleDisplay()' option")
            break;
    }

    //need to not just pop up modal, but populate it based on the id passed to this.
    //needs to take ID and props
    //if the ID has bio in it, call bioEditModal
}

window.PopModal = PopModal