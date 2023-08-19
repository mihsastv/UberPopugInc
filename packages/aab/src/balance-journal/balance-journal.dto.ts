export class BalanceAssigned {
  constructor(props: BalanceAssigned) {
    this.credit = props.credit;
    this.taskId = props.taskId;
    this.accountId = props.accountId;
  }
  taskId!: string;
  credit!: number;
  accountId!: string;
}

export class BalanceComplited {
  constructor(props: BalanceComplited) {
    this.debet = props.debet;
    this.taskId = props.taskId;
    this.accountId = props.accountId;
  }
  taskId!: string;
  debet!: number;
  accountId!: string;
}

export class BalanceWithdlowl {
  constructor(props: BalanceWithdlowl) {
    this.accountId = props.accountId;
  }
  accountId!: string;
}

export class BalanceWithdlowlFail {
  constructor(props: BalanceWithdlowlFail) {
    this.accountId = props.accountId;
    this.amount = props.amount;
  }
  accountId!: string;
  amount!: number;
}
