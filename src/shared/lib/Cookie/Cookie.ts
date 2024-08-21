export class Cookie {

  static set(name: string, value: string, seconds?: number) {
    let expires = '';
    if (seconds) {
      const date = new Date();
      date.setTime(date.getTime() + (seconds * 1000));
      expires = '; expires=' + date.toString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
  }

  static get(name: string) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  static erase(name: string) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
