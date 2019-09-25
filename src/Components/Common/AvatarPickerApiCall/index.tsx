import Constants from 'expo-constants';
import React from 'react';
import PropTypes from 'prop-types';
import sha1 from 'sha1';
import superagent from 'superagent';
// import curateErrors from './utils';

// See: https://www.youtube.com/watch?v=WOTFmPkWbxo
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the ProfileEditForm and calls API to store
 * data into the DB.
 */
class AvatarPickerApiCall extends React.PureComponent {
  handleUpload = async (inputFields) => {
    const { onError, onSuccess } = this.props;
    const { file } = inputFields;

    const url = `https://api.cloudinary.com/v1_1/${Constants.manifest.extra.cloudinaryCloudname}/image/upload`;
    const timestamp = Date.now() / 1000;

    const paramsStr = `timestamp=${timestamp}&upload_preset=${Constants.manifest.extra.cloudinaryUploadPreset}${Constants.manifest.extra.cloudinaryApiSecret}`;

    const signature = sha1(paramsStr);

    const params = {
      api_key: Constants.manifest.extra.cloudinaryApiKey,
      timestamp,
      upload_preset: Constants.manifest.extra.cloudinaryUploadPreset,
      signature,
    };

    const req = superagent.post(url);
    req.attach('file', file);

    Object.keys(params).forEach((key) => {
      req.field(key, params[key]);
    });

    // console.log('HANDLE UPDATE', inputFields);

    req.end((err, res) => {
      if (err) {
        console.log(err);
        onError(err);
      }

      // console.log('UPDATE RESPONSE', res);
      // console.log('UPDATE RESPONSE BODY', res.body);
      // console.log('res.body.secureUrl', res.body.secureUrl);
      onSuccess(res.body.secure_url);
    });

    // const res = await SeedorfAPI.sendMagicLoginLink(email);

    // // Pass event up to parent component
    // if (res && res.problem) {
    //   console.log('response', res);
    //   const errors = curateErrors(res.data);
    //   onError(errors);
    //   return;
    // }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      uploadImg: this.handleUpload,
    };

    return children(api);
  }
}

AvatarPickerApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

AvatarPickerApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

export default AvatarPickerApiCall;
