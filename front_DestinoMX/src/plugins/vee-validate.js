// Importa Vue de manera más convencional
import Vue from "vue";

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";

import es from "vee-validate/dist/locale/es.json";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// noinspection JSCheckFunctionSignatures
localize("es", es);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
