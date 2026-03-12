import pytest
import os

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from webdriver_manager.chrome import ChromeDriverManager


class TestCalculator:

    @pytest.fixture(scope="class")
    def driver(self):
        """Initialisation du navigateur Chrome"""

        chrome_options = Options()

        # Configuration pour CI (GitHub Actions, GitLab CI, etc.)
        if os.getenv("CI"):
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")

        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)

        driver.implicitly_wait(10)

        yield driver

        driver.quit()

    def test_page_loads(self, driver):
        """Test 1 : vérifier que la page se charge"""

        driver.get("http://localhost:5173")

        # Vérifier le titre de la page
        assert "Gestionnaire de Tâches" in driver.title

    def test_root_exists(self, driver):
        """Test 2 : vérifier que React a rendu le root"""

        driver.get("http://localhost:5173")

        root = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "root"))
        )

        assert root.is_displayed()

    def test_page_content(self, driver):
        """Test 3 : vérifier qu'un élément apparaît dans la page"""

        driver.get("http://localhost:5173")

        body = driver.find_element(By.TAG_NAME, "body")

        assert body is not None


if __name__ == "__main__":
    pytest.main(["-v", "--html=report.html", "--self-contained-html"])