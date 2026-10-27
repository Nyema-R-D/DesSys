import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { DateField } from '../DateField/DateField';
import { FileUpload } from '../FileUpload/FileUpload';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { Select } from '../Select/Select';
import { Switch } from '../Switch/Switch';
import { TextField } from '../TextField/TextField';
import { Fieldset, FormActions, FormRow } from './Fieldset';

const meta = {
  title: 'Composants/Formulaire',
  component: Fieldset,
  args: { legend: 'Coopérative', description: 'Telle qu’enregistrée auprès de la mairie.' },
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Section: Story = {
  render: (args) => (
    <Fieldset {...args}>
      <FormRow>
        <TextField label="Nom" required />
        <TextField label="Numéro d’enregistrement" />
      </FormRow>
      <TextField label="Adresse" />
    </Fieldset>
  ),
};

export const FormulaireComplet: Story = {
  name: 'Formulaire complet',
  render: () => (
    <form style={{ display: 'grid', gap: 48, maxWidth: 760 }} onSubmit={(e) => e.preventDefault()}>
      <Fieldset legend="Coopérative" description="Telle qu’enregistrée auprès de la mairie.">
        <FormRow>
          <TextField label="Nom" required />
          <Select
            label="Région"
            placeholder="Choisir…"
            options={[
              { value: 'segou', label: 'Ségou' },
              { value: 'sikasso', label: 'Sikasso' },
            ]}
          />
        </FormRow>
        <FormRow columns={3}>
          <TextField label="Membres" type="number" inputMode="numeric" />
          <DateField label="Date de création" />
          <TextField label="Téléphone" type="tel" />
        </FormRow>
      </Fieldset>
      <Fieldset legend="Visite">
        <RadioGroup
          legend="Type de visite"
          orientation="horizontal"
          options={[
            { value: 'suivi', label: 'Suivi' },
            { value: 'audit', label: 'Audit' },
          ]}
          defaultValue="suivi"
        />
        <TextField
          label="Observations"
          multiline
          maxLength={500}
          showCount
          hint="Ce qui a été vu, sans jugement."
        />
        <FileUpload label="Photos" hint="Images, 10 Mo maximum." accept="image/*" multiple />
        <Switch label="Envoyer au retour du réseau" defaultChecked />
        <Checkbox label="Les membres présents ont donné leur accord." />
      </Fieldset>
      <FormActions>
        <Button type="submit">Enregistrer la visite</Button>
        <Button variant="secondary" type="reset">
          Annuler
        </Button>
      </FormActions>
    </form>
  ),
};
