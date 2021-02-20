export const menu_items = [
    {
        icon: 'marketing.png', text: 'Marketing', value: 'marketing',
        sub_item: [
            { label: 'Brochures', value: 'brochure', defalut: process.env.PUBLIC_URL + "/assets/img/development/broucher.png"},
            { label: 'CGIs', value: 'cgi', defalut:  process.env.PUBLIC_URL + "/assets/img/development/floorplanDefault.png" },
            { label: 'Photos & Videos', value: 'video', defalut:  process.env.PUBLIC_URL + "/assets/img/development/broucher.png" }
        ]
    },
    {
        icon: 'floor.png', text: 'Floor Plans', value: 'floorplan',
        // sub_item: [
        //     { label: 'FloorPlans', value: 'floorplan' }]
    },
    {
        icon: 'pr.png', text: 'Press & PR', value: 'pressPR',
        // sub_item: [
        //     { label: 'Articles', value: 'pressPR' }
        // ]
    },
    {
        icon: 'rental.png', text: 'Rental Support', value: 'rentalSupport',
        // sub_item: [
        //     { label: 'Property Mangement Document', value: 'management_document' }
        // ]
    },
    {
        icon: 'dil.png', text: 'Due Diligence', value: 'dueDelegnce',
        // sub_item: [
        //     { label: 'Property Mangement Document', value: 'management_document' },
        //     { label: 'Planning Document', value: 'planning_document' }
        // ]
    },
    {
        icon: 'building.png', text: 'Progress', value: 'buildUpdate',
        // sub_item: [
        //     { label: 'Build Updates', value: 'build_updates' }
        // ]
    },
    {
        icon: 'legal.png', text: 'Legal', value: 'legalDocument',
        // sub_item: [
        //     { label: 'Legal Documents', value: 'legal_documents' }
        // ]
    },
    {
        icon: 'reservation_form.png', text: 'Reservation Form', value: 'reservation',
        // sub_item: [
        //     { label: 'Reservation Form', value: 'reservation_form' }
        // ]
    },
    {
        icon: 'available.png', text: 'Availability', value: 'availability',
        // sub_item: [
        //     { label: 'Availabilty', value: 'availabilty' }
        // ]
    }
]
