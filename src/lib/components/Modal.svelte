<script>
    export let close;
    export let message = "Are you sure?";
    export let isConfirm = false;
  </script>
  
  <div class="modal-backdrop" on:click={() => close(false)}>
    <div class="modal-content" on:click|stopPropagation>
      <p>{message}</p>
      {#if isConfirm}
        <!-- Confirm and Cancel buttons for delete action -->
        <button on:click={() => close(true)} class="confirm-btn">Confirm</button>
        <button on:click={() => close(false)} class="cancel-btn">Cancel</button>
      {:else}
        <!-- Single Dismiss button for add success message -->
        <button on:click={() => close(false)} class="dismiss-btn">Dismiss</button>
      {/if}
    </div>
  </div>
  
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .modal-content {
      background: #1a1a1a; /* Black background */
      color: white;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      max-width: 300px;
      width: 100%;
    }
  
    .confirm-btn, .cancel-btn, .dismiss-btn {
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
      margin-right: 0.5rem;
    }
  
    .confirm-btn {
      background-color: #4CAF50; /* Green for confirm */
    }
  
    .cancel-btn {
      background-color: #f44336; /* Red for cancel */
    }
  
    .dismiss-btn {
      background-color: #333; /* Neutral color for dismiss */
    }
  
    .confirm-btn:hover, .cancel-btn:hover, .dismiss-btn:hover {
      filter: brightness(1.2);
    }
  </style>