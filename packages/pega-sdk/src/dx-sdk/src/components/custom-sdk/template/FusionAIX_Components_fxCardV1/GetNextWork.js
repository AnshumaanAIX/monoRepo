import { Button, useToaster } from '@pega/cosmos-react-core';

export default function GetNextWork(props) {
  const { getPConnect, variant } = props;

  const toasterCtx = useToaster();

  const localizedVal = PCore.getLocaleUtils().getLocaleValue;

  const getNextWork = () => {
    getPConnect()
      .getActionsApi()
      .getNextWork()
      .catch((err) => {
        console.log(err);
        if (err[0].status === 404) {
          toasterCtx.push({
            content: localizedVal('No task currently available')
          });
        }
      });
  };

  return (
    <Button variant={variant} onClick={getNextWork}>
      {getPConnect().getLocalizedValue('Get next work')}
    </Button>
  );
}
