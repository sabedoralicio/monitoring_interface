<template>
  <!--
  <a :href="apiFunUrl(nodeURL, apiFunction)">{{ apiFunction }}</a
  >: {{ filteredResponse(nestAPIFunctionResponse) }}<br />
-->
  <a :href="apiFunUrl(nodeURL, apiFunction)">{{ apiFunction }}</a
  >: {{ nestAPIFunctionResponse }}<br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCounterStore } from '@/store/index'

export default defineComponent({
  name: "NestAPILinkText",
  props: {
    nodeURL: String,
    apiFunction: String,
  },
  data() {
    return {
      nestAPIFunctionResponse: "",
    };
  },
  methods: {
    apiFunUrl(nodeURL: string, apiFunction: string) {
      return nodeURL + "/api/" + apiFunction;
    },
    filteredResponse(code: string): string {
      return showNestResponseLore(asNestResponseLore(code));
    },
  },
  created() {
    fetch(this.$props.nodeURL + "/api/" + this.$props.apiFunction)
      .then((response) => response.text())
      .then((data) => (this.nestAPIFunctionResponse = data));
  },
});

enum NestResponseKind {
  CallableSignatureNotSupported,
  HtmlMessage,
  KernelException,
  MissingArguments,
  NoHelpIndex,
  NotInNestModule,
  SLIFunctionDictError,
  UndefinedName,
  UnexpectedObject,
  Other,
}

type NestResponseLore = {
  kind: NestResponseKind;
  code: string;
};

function isCallableSignatureNotSupported(responseString: string): boolean {
  if (responseString.indexOf("callable <") != 0) {
    return false;
  } else {
    let rest = responseString.split(">", 2);
    return rest[1] === " is not supported by signature";
  }
}

function isHtmlMessage(responseString: string): boolean {
  return responseString.indexOf("<!doctype html>") == 0;
}

function isKernelException(responseString: string): boolean {
  return responseString.indexOf("KernelException") == 0;
}

function isMissingArguments(responseString: string): boolean {
  return (
    responseString.includes("() missing ") &&
    responseString.includes(" required positional argument")
  );
}

function isNoHelpIndex(responseString: string): boolean {
  return (
    responseString.indexOf("Sorry, the help index cannot be opened. ") == 0
  );
}

function isNotInNestModule(responseString: string): boolean {
  return responseString.indexOf("module 'nest' has no attribute") == 0;
}

function isSLIFunctionDictError(responseString: string): boolean {
  return (
    responseString.indexOf("DictError in SLI function SLIInterpreter") == 0
  );
}

function isUndefinedName(responseString: string): boolean {
  if (responseString.indexOf("name '") != 0) {
    return false;
  } else {
    let rest = responseString.split("'", 3);
    return rest[2] === " is not defined";
  }
}

function isUnexpectedObject(responseString: string): boolean {
  return responseString.indexOf("unexpected object <") == 0;
}

function asNestResponseLore(responseString: string): NestResponseLore {
  if (isCallableSignatureNotSupported(responseString)) {
    return {
      kind: NestResponseKind.CallableSignatureNotSupported,
      code: responseString,
    };
  } else if (isHtmlMessage(responseString)) {
    return { kind: NestResponseKind.HtmlMessage, code: responseString };
  } else if (isKernelException(responseString)) {
    return { kind: NestResponseKind.KernelException, code: responseString };
  } else if (isMissingArguments(responseString)) {
    return { kind: NestResponseKind.MissingArguments, code: responseString };
  } else if (isNoHelpIndex(responseString)) {
    return { kind: NestResponseKind.NoHelpIndex, code: responseString };
  } else if (isNotInNestModule(responseString)) {
    return { kind: NestResponseKind.NotInNestModule, code: responseString };
  } else if (isSLIFunctionDictError(responseString)) {
    return {
      kind: NestResponseKind.SLIFunctionDictError,
      code: responseString,
    };
  } else if (isUndefinedName(responseString)) {
    return { kind: NestResponseKind.UndefinedName, code: responseString };
  } else if (isUnexpectedObject(responseString)) {
    return { kind: NestResponseKind.UnexpectedObject, code: responseString };
  } else {
    return { kind: NestResponseKind.Other, code: responseString };
  }
}

function showNestResponseLore(lore: NestResponseLore): string {
  switch (lore.kind) {
    case NestResponseKind.CallableSignatureNotSupported: {
      return "CALLABLE SIGNATURE NOT SUPPORTED";
    }
    case NestResponseKind.HtmlMessage: {
      return "HTML MESSAGE";
    }
    case NestResponseKind.KernelException: {
      return "KERNEL EXCEPTION";
    }
    case NestResponseKind.MissingArguments: {
      return "MISSING ARGUMENTS";
    }
    case NestResponseKind.NoHelpIndex: {
      return "NO HELP INDEX";
    }
    case NestResponseKind.NotInNestModule: {
      return "NOT IN NEST MODULE";
    }
    case NestResponseKind.SLIFunctionDictError: {
      return "SLI FUNCTION DICT ERROR";
    }
    case NestResponseKind.UndefinedName: {
      return "UNDEFINED NAME";
    }
    case NestResponseKind.UnexpectedObject: {
      return "UNEXPECTED OBJECT";
    }
    default: {
      // "max_update_time":-Infinity
      let negInf = /-"Infinity"/g;
      let posInf = /Infinity/gi;
      return lore.code
        .replaceAll(posInf, '"Infinity"')
        .replaceAll(negInf, '"-Infinity"');
    }
  }
}
</script>
