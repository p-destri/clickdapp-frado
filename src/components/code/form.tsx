import React from 'react';
import { VmComponent } from '@/components/vm/VmComponent';
import { useVMContext } from '@/vm-context';

export const customFormMeta: any = {
  name: 'bos-custmo-form',
  importName: 'CustomForm',
  displayName: '[BOS] CustomForm',
  importPath: '@/components/code',
  props: {
    input: {
      type: "slot",
      defaultValue: [
        {
          name: 'ui-input',
          type: "component",
        }
      ],
    },
    button: {
      type: "slot",
      defaultValue: [
        {
          name: 'ui-button',
          type: "component",
        }
      ],
    },
  }
};

export function CustomForm(props: any) {
  const context = useVMContext()

  const renderPlasmicElement = (element: any, values: any) => {
    return React.cloneElement(props[element], values)
  }

  return (
    <VmComponent
      src="1mateus.testnet/widget/form"
      props={{
        ...context,
        renderPlasmicElement,
        plasmicRootClassName: props.className,
      }}
    />
  );
}