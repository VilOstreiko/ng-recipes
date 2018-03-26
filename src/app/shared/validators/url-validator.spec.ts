import { UrlValidator } from './url-validator';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

xdescribe('UrlValidator', () => {
  // let urlValidator: UrlValidator;
  let form: FormGroup;
  const photoUrlRegExp = /(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*\.(?:jpe?g|gif|png|svg))(?:\?([^#]*))?(?:#(.*))?/;

  beforeEach(() => {
    form = new FormGroup({
      'url': new FormControl(null,
        [UrlValidator(this.photoUrlRegExp)]),
    });
  });

  describe('validation', () => {
    it('should return null if input url is valid', () => {
    });

    it('should return isUrlInvalid: true if input url is invalid', () => {
    });
  });

});
