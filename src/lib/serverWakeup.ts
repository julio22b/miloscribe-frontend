type Listener = (waking: boolean) => void;

const listeners = new Set<Listener>();

export function subscribeServerWakeup(listener: Listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function setServerWakingUp(waking: boolean) {
    listeners.forEach((listener) => listener(waking));
}
