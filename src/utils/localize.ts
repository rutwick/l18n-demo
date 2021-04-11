import Polyglot from 'node-polyglot'

let polyglot = new Polyglot()

const initBrowserLang = (): string | undefined => {
    if (typeof window === 'undefined' 
        || typeof window.navigator === 'undefined') {
      return undefined;
    }

    let browserLang: string | null =
        window.navigator.languages 
        && window.navigator.languages.length > 0 ? 
            window.navigator.languages[0] : null;
    // @ts-ignore
    browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

    if (typeof browserLang === 'undefined') {
        return undefined;
    }

    if (browserLang.indexOf('-') !== -1) {
        browserLang = browserLang.split('-')[0];
    }

    if (browserLang.indexOf('_') !== -1) {
        browserLang = browserLang.split('_')[0];
    }

    return browserLang;
}

const fetchLocaleStringsForComponent = (locale: string): Promise<any> => {
    return new Promise((resolve, reject): void => {
      fetch(`/lang/${locale}.json`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
       })
      .then((result) => {
        if (result.ok) resolve(result.json());
        else reject();
      }, () => reject());
    });
}

const locale = initBrowserLang()
try {
    await fetchLocaleStringsForComponent(locale).then(r => polyglot.extend(r))
} catch(e) {
    await fetchLocaleStringsForComponent("en").then(r =>  polyglot.extend(r))
}

export default polyglot;