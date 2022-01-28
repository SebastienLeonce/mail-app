export default interface Mail {
    _id ? : string,
        metadata: {
            name: string,
            account: string,
            from: string,
            date ? : Date | string
            titre: string,
            categories: string[],
            to: string
        };
    interaction: boolean;
    content: string;
    history: string
}

export const emptyMail = { 
    metadata: {
      name: '',
      account: '',
      from: '',
      titre: '',
      categories: [],
      to: ''
    },
    content: '',
    interaction: true,
    history: ''
}