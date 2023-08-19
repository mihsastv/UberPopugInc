import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { TransactionJournal, TransactionStatus } from '../model';

@Injectable()
export class TransactionJournalService {
  constructor(private em: EntityManager) {}

  createTransaction(props: TransactionJournal) {
    this.em.persistAndFlush(props);
  }

  async updateStatatusTransaction(props: {
    publicId: string;
    status: TransactionStatus;
  }) {
    const transaction = await this.em.findOne(TransactionJournal, {
      publicId: props.publicId,
    });

    if (!transaction) {
      return;
    }

    transaction.status = props.status;
    this.em.flush();
  }
}
