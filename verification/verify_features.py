
from playwright.sync_api import sync_playwright
import os

def verify_new_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        cwd = os.getcwd()
        index_url = f"file://{cwd}/index.html"
        join_url = f"file://{cwd}/join.html"

        # 1. Verify Events Filtering
        print(f"Loading {index_url}")
        page.goto(index_url)

        # Wait for events to load
        page.wait_for_selector('.event-card')

        # Initial count (All)
        all_events_count = page.locator('.event-card').count()
        print(f"All events count: {all_events_count}")
        assert all_events_count >= 5 # We seeded 5 events

        # Filter by Workshop
        page.click('button[data-filter="workshop"]')
        page.wait_for_timeout(500) # Wait for fade

        # Count visible events
        workshop_events_count = page.locator('.event-card').count()
        print(f"Workshop events count: {workshop_events_count}")
        assert workshop_events_count == 2 # 2 workshops in seed data

        page.screenshot(path="verification/events_filtered.png")

        # 2. Verify Join Form persistence
        print(f"Loading {join_url}")
        page.goto(join_url)

        # Fill Step 1
        page.fill('#full_name', 'Test Archer')
        page.fill('#matric_no', '123456')
        page.fill('#email', 'test@live.iium.edu.my')
        page.select_option('#kulliyyah', 'KICT')

        # Click Next
        page.click('.btn-next')
        page.wait_for_selector('#step-2.active')

        # Reload Page to test persistence
        print("Reloading page to test persistence...")
        page.reload()

        # Check if values persisted
        val = page.input_value('#full_name')
        print(f"Persisted Name: {val}")
        assert val == 'Test Archer'

        page.screenshot(path="verification/form_persistence.png")

        browser.close()

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    verify_new_features()
