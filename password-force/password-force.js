'use strict';

import FormValidation from '../scripts/form-validation';

export default class PasswordForce extends FormValidation {
  constructor($, queryelement, settings) {
    settings = $.extend({}, settings);
    super($, queryelement, settings);
    this.name = 'password-force';
    this.$ = $;
    this.$element = $(queryelement);
    this.settings = settings;
    this.rulesOk = {};
    this.patchVaidate();
    this.setEvents();
  }
  patchVaidate() {
    let $ = this.$;
    $.validator.prototype.ruleValidationStatus = function (element) {
      element = $(element)[0];
      var rules = $(element).rules();
      var errors = {};
      for (var method in rules) {
        var rule = { method: method, parameters: rules[method] };
        try {
          var result = $.validator.methods[method].call(this, element.value.replace(/\r/g, ''), element, rule.parameters);

          errors[rule.method] = result;

        } catch (e) {
          console.log(e);
        }
      }
      return errors;
    };
  }
  setEvents() {
    let $ = this.$;
    let that = this;
    this.$element.on('keyup', 'input', (e) => {
      let validator = that.valid;
      $('.password-validation').removeClass('bg-danger bg-warning bg-info bg-success');
      that.$element.find('*').removeClass('bg-danger bg-warning bg-info bg-success');
      let countOk = 0;
      let total = 0;
      let rules = validator.ruleValidationStatus($('#password'));
      let equalTo = validator.ruleValidationStatus($('#password2'));
      $.extend(rules, equalTo);
      $.each(rules, function (i, val) {
        total++;
        if (val && rules.required) {
          countOk++;
          $('.' + i).addClass('text-success');
        } else {
          $('.' + i).removeClass('text-success');
        }
      });

      switch (true) {
        case rules.required && (countOk / total) >= 1:
          $('.password-validation').addClass('bg-success');
          break;
        case rules.required && (countOk / total) > .7:
          $('.password-validation').addClass('bg-info');
          break;
        case rules.required && (countOk / total) > .4:
          $('.password-validation').addClass('bg-warning');
          break;
        default:
          $('.password-validation').addClass('bg-danger');
          break;
      }
    });
    $.validator.methods.oneuppercase = function (value, element) {
      return this.optional(element) || that.checkRule(/(?=.*[a-z])(?=.*[A-Z])/, value);
    };
    $.validator.methods.onenumber = function (value, element) {
      return this.optional(element) || that.checkRule(/(?=.*\d)/, value);
    };
    $.validator.methods.onespecial = function (value, element) {
      return this.optional(element) || that.checkRule(/(?=.*[\.\-_$@$!%*?&])/, value);
    };
  }
}
