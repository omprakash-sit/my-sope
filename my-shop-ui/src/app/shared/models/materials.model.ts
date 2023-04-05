export class MaterialsInvoiceEntry {
    constructor(
        public m: string,
        public q: number,
        public p: number,
        public mqp: number
    ) { }
}
export class MaterialsName {
    constructor(
        public id: string,
        public name: string,
        public grade?: string,
        public brand?: string
    ) { }
}