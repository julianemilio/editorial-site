export { };

declare global {
    interface Window {
        ePayco: {
            checkout: {
                configure: (options: { key: string; test: boolean }) => {
                    open: (data: {
                        name: string;
                        description: string;
                        invoice: string;
                        currency: string;
                        amount: string;
                        tax_base: string;
                        tax: string;
                        country: string;
                        lang: string;
                        external: string;
                        response: string;
                        confirmation: string;
                        name_billing: string;
                        email_billing: string;
                        mobilephone_billing: string;
                    }) => void;
                };
            };
        };
    }
}
