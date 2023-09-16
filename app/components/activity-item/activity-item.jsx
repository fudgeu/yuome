
/*
Prop[0]:
{
  type: 'request' | 'payment'
  from: string
  amount: number
  note: string
}
*/
export default function ActivityItem(props) {

  const getTitleText = useCallback(() => {
    if (props[0].type === 'request') {
      return (<h2>{props[0].from} requested</h2>)
    } else if (props[0].type === 'payment') {
      return (<h2>You paid {props[0].from}</h2>)
    }
  }, [props])

  return (
    <div className={styles.item}>
      {getTitleText()}
      <p className={styles.amount}>${props[0].amount}</p>
      <p className={styles.note}>{props[0].note}</p>
    </div>
  )
}