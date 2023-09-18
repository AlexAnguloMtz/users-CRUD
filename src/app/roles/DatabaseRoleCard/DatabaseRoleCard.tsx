'use client';

import styles from './styles.module.css';
import avatarImage from '../../../../public/profile-avatar.png';
import { DatabaseRole } from '@/app/common/dtos/responses/DatabaseRole';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

export function DatabaseRoleCard({
    model,
    onClick,
}: {
    model: DatabaseRole,
    onClick: MouseEventHandler<HTMLElement>
}): JSX.Element {

    const router = useRouter();

    return (
        <article
            className={styles.card}
            onClick={onClick}>
            {model.isSuperUser ? <SuperUserTag /> : <></>}
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

function SuperUserTag(): JSX.Element {
    return (
        <p className={styles.superUserTag}>
            Super Usuario
        </p>
    );
}