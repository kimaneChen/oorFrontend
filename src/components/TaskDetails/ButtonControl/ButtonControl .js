/* eslint-disable no-underscore-dangle */
import React from 'react';
import Button from '../../Button';

const buttonOptions = [
  {
    // 0
    cmd: 'Unlogined',
    value: 'Login/Make an Offer',
    variant: 'green',
    disable: true,
  },
  {
    // 1
    cmd: 'makeOffer',
    value: 'Make an Offer',
    variant: 'green',
    disable: false,
  },
  {
    // 2
    cmd: 'updateOffer',
    value: 'Update the Offer',
    variant: 'red',
    disable: false,
  },
  {
    // 3
    cmd: 'clientWait',
    value: 'Waiting Offer',
    variant: 'grey',
    disable: true,
  },
  {
    // 4: todo....
    cmd: 'clientReview',
    value: 'Review Offers',
    variant: 'primary',
    disable: false,
  },
  {
    // 5
    cmd: 'taskCancelled',
    value: 'taskCanceled',
    variant: 'red',
    disable: true,
  },
  {
    // 6
    cmd: 'taskAssigned',
    value: 'Await Complete',
    variant: 'grey',
    disable: true,
  },
  {
    // 7
    cmd: 'reviewOffer',
    value: 'Review',
    variant: 'primary',
    disable: true,
  },
  {
    // 8: task completed waiting for confirm
    cmd: 'completeTask',
    value: 'Completed',
    variant: 'primary',
    disable: false,
  },
  {
    // 9: task completed and confirmed: closed
    cmd: 'closedTask',
    value: 'Closed',
    variant: 'primary',
    disable: true,
  },
];

export default function ButtonControl(user, taskDetail, handleClick) {
  let index = 0;
  const { clientId, offers, status } = taskDetail;
  const offerTook = offers.find((offer) => offer.user._id === user.id);

  /* eslint-disable react/destructuring-assignment */
  if (user.id && user.id !== '') {
    if (user.id !== clientId._id) {
      if (!offerTook) {
        // offer not post by me
        index = 1;
      } else {
        switch (status) {
          // status: task's status
          case 'assigned':
            index = 8;
            break;
          case 'completed':
            index = 9;
            break;
          default:
            // offer post by me and task not assigned and not completed
            index = 2;
            break;
        }
      }
    } else {
      if (offers.length > 0) {
        switch (status) {
          case 'assigned':
            index = 6;
            break;
          case 'completed':
            index = 7;
            break;
          default:
            index = 4;
            break;
        }
      }

      index = 3;
    }
  }

  return (
    <Button
      variant={buttonOptions[index].variant}
      size="md"
      disabled={buttonOptions[index].disable}
      onClick={() => {
        handleClick(buttonOptions[index].cmd, offerTook);
      }}
    >
      {buttonOptions[index].value}
    </Button>
  );
}
