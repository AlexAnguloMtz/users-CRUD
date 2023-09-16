'use client';

import styles from './styles.module.css';
import avatarImage from '../../../../public/profile-avatar.png';
import { DatabaseRole } from '@/app/common/dtos/responses/DatabaseRole';
import Image from 'next/image';

export function DatabaseRoleCard({ model }: {
    model: DatabaseRole
}): JSX.Element {
    return (
        <article className={styles.card}>
            <div className={styles.avatarAndNameWrapper}>
                <Avatar />
                <h3 className={styles.name}>{model.name}</h3>
            </div>
        </article>
    );
}

function Avatar(): JSX.Element {
    return (
        <Image
            src={avatarImage}
            alt='avatar'
            className={styles.avatar} />
    );
}