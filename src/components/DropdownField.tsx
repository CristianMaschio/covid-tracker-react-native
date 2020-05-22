import { Label, View } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import React from 'react';
import { PickerItemProps, StyleSheet, PickerProps } from 'react-native';
import DropdownIcon from '../../assets/icons/Dropdown';

import { colors } from '../../theme';
import i18n from '../locale/i18n';
import { FieldWrapper, screenWidth } from './Screen';
import { ValidationError } from './ValidationError';

interface DropdownFieldProps {
  placeholder?: string | undefined;
  selectedValue?: any;
  onValueChange: any;
  label?: string;
  items?: PickerItemProps[];
  pickerProps?: PickerProps;
  androidDefaultLabel?: string;
  error?: any;
  onlyPicker?: boolean;
}

type State = {
  items?: PickerItemProps[];
  options?: string[];
};

class DropdownField extends React.Component<DropdownFieldProps, State> {
  state = {
    items: [],
    options: [],
  };

  componentDidMount() {
    let items = this.props.items ?? [
      { label: i18n.t('picker-no'), value: 'no' },
      { label: i18n.t('picker-yes'), value: 'yes' },
    ];

    this.setState({ items, options: items.map((item) => item.label) });
  }

  onValueChange = (id: any, label: any) => {
    if (id !== -1) {
      this.props.onValueChange(this.state.items.find((item: PickerItemProps) => item.label === label)?.value);
    }
  };

  render() {
    // Can be used as a yes/no dropdown field by leaving props.items blank.
    const { label, error, onlyPicker, selectedValue } = this.props;
    const { options } = this.state;

    return (
      <FieldWrapper style={styles.fieldWrapper}>
        {onlyPicker ? null : <Label style={styles.labelStyle}>{label}</Label>}
        <ModalDropdown
          style={styles.dropdownButton}
          options={options}
          defaultValue={selectedValue}
          onSelect={this.onValueChange}>
          <View style={styles.dropdownButtonContainer}>
            <Label style={styles.dropdownValue}>{selectedValue || 'Choose one of the options'}</Label>
            <DropdownIcon width={15} height={19} />
          </View>
        </ModalDropdown>
        {!!error && (
          <View style={{ marginTop: 10 }}>
            <ValidationError error={error} />
          </View>
        )}
      </FieldWrapper>
    );
  }
}

const styles = StyleSheet.create({
  fieldWrapper: {
    flex: 1,
    marginVertical: 32,
    marginHorizontal: 16,
  },
  labelStyle: {
    fontSize: 15,
    lineHeight: 30,
    color: colors.primary,
  },
  picker: {
    width: screenWidth - 16,
    marginTop: 12,
  },
  errorHighlight: {
    borderBottomWidth: 1,
    borderColor: colors.feedbackBad,
  },
  dropdownButton: {
    backgroundColor: colors.backgroundTertiary,
    height: 48,
    borderRadius: 8,
  },
  dropdownButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  dropdownValue: { color: colors.secondary },
});

export default DropdownField;
