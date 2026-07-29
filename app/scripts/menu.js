'use client';

import { useEffect } from 'react';

export default function MenuScript() {
  useEffect(() => {
    const openButton = document.querySelector('.wp-block-navigation__responsive-container-open');
    const closeButton = document.querySelector('.wp-block-navigation__responsive-container-close');
    const container = document.querySelector('.wp-block-navigation__responsive-container');
    const dialog = document.querySelector('.wp-block-navigation__responsive-dialog');

    if (!openButton || !container) return;

    // Open menu
    const handleOpen = function(e) {
      e.preventDefault();
      container.classList.add('has-modal-open', 'is-menu-open');
      if (dialog) {
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('role', 'dialog');
      }
      document.body.style.overflow = 'hidden';
    };

    // Close menu
    const handleClose = function(e) {
      e.preventDefault();
      closeMenu();
    };

    // Close on escape key
    const handleKeyDown = function(e) {
      if (e.key === 'Escape' && container.classList.contains('is-menu-open')) {
        closeMenu();
      }
    };

    // Close on focus out (accessibility)
    const handleFocusOut = function(e) {
      if (!container.contains(e.relatedTarget) && container.classList.contains('is-menu-open')) {
        closeMenu();
      }
    };

    function closeMenu() {
      container.classList.remove('has-modal-open', 'is-menu-open');
      if (dialog) {
        dialog.setAttribute('aria-modal', 'false');
        dialog.removeAttribute('role');
      }
      document.body.style.overflow = '';
      if (openButton) {
        openButton.focus();
      }
    }

    openButton.addEventListener('click', handleOpen);
    if (closeButton) {
      closeButton.addEventListener('click', handleClose);
    }
    document.addEventListener('keydown', handleKeyDown);
    if (container) {
      container.addEventListener('focusout', handleFocusOut);
    }

    return () => {
      openButton.removeEventListener('click', handleOpen);
      if (closeButton) {
        closeButton.removeEventListener('click', handleClose);
      }
      document.removeEventListener('keydown', handleKeyDown);
      if (container) {
        container.removeEventListener('focusout', handleFocusOut);
      }
    };
  }, []);

  return null;
}
