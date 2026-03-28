#!/usr/bin/env python3
"""
CONSTELLATION Blog API Testing Suite
Tests all backend functionality including auth, articles, likes, comments, categories, and search.
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any, Optional

class ConstellationBlogTester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.token = None
        self.admin_user = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        self.created_articles = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            print(f"❌ {name} - {details}")
        
        self.test_results.append({
            "name": name,
            "success": success,
            "details": details
        })

    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, 
                    expected_status: int = 200, headers: Optional[Dict] = None) -> tuple:
        """Make HTTP request and return success status and response data"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        request_headers = {'Content-Type': 'application/json'}
        if self.token:
            request_headers['Authorization'] = f'Bearer {self.token}'
        if headers:
            request_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=request_headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=request_headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=request_headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=request_headers)
            else:
                return False, {"error": f"Unsupported method: {method}"}

            success = response.status_code == expected_status
            try:
                response_data = response.json()
            except:
                response_data = {"status_code": response.status_code, "text": response.text}

            return success, response_data

        except Exception as e:
            return False, {"error": str(e)}

    def test_health_check(self):
        """Test API health endpoint"""
        success, data = self.make_request('GET', '/api/health')
        self.log_test("Health Check", success and data.get('status') == 'healthy')

    def test_admin_login(self):
        """Test admin authentication"""
        login_data = {
            "email": "admin@constellation.cd",
            "password": "Constellation2025!"
        }
        
        success, data = self.make_request('POST', '/api/auth/login', login_data)
        
        if success and 'token' in data:
            self.token = data['token']
            self.admin_user = data
            self.log_test("Admin Login", True)
            return True
        else:
            self.log_test("Admin Login", False, f"Login failed: {data}")
            return False

    def test_admin_me(self):
        """Test getting current admin user info"""
        if not self.token:
            self.log_test("Admin Me", False, "No token available")
            return False
            
        success, data = self.make_request('GET', '/api/auth/me')
        
        if success and data.get('role') == 'admin':
            self.log_test("Admin Me", True)
            return True
        else:
            self.log_test("Admin Me", False, f"Failed to get admin info: {data}")
            return False

    def test_get_categories(self):
        """Test getting categories"""
        success, data = self.make_request('GET', '/api/categories')
        
        if success and isinstance(data, list) and len(data) > 0:
            self.log_test("Get Categories", True)
            return data
        else:
            self.log_test("Get Categories", False, f"Failed to get categories: {data}")
            return []

    def test_create_article(self):
        """Test creating a new article"""
        if not self.token:
            self.log_test("Create Article", False, "No admin token")
            return None
            
        article_data = {
            "title": f"Test Article {datetime.now().strftime('%H%M%S')}",
            "excerpt": "This is a test article excerpt for testing purposes.",
            "content": "This is the full content of the test article. It contains multiple paragraphs.\n\nThis is the second paragraph with more detailed information about the test.",
            "category": "Actualités",
            "tags": ["test", "automation", "blog"],
            "image_url": "https://via.placeholder.com/800x400/0066cc/ffffff?text=Test+Article"
        }
        
        success, data = self.make_request('POST', '/api/articles', article_data, 201)
        
        if success and 'id' in data:
            article_id = data['id']
            self.created_articles.append(article_id)
            self.log_test("Create Article", True)
            return article_id
        else:
            self.log_test("Create Article", False, f"Failed to create article: {data}")
            return None

    def test_get_articles(self):
        """Test getting published articles"""
        success, data = self.make_request('GET', '/api/articles')
        
        if success and 'articles' in data and isinstance(data['articles'], list):
            self.log_test("Get Articles", True)
            return data['articles']
        else:
            self.log_test("Get Articles", False, f"Failed to get articles: {data}")
            return []

    def test_get_article_detail(self, article_id: str):
        """Test getting a specific article"""
        if not article_id:
            self.log_test("Get Article Detail", False, "No article ID provided")
            return None
            
        success, data = self.make_request('GET', f'/api/articles/{article_id}')
        
        if success and data.get('id') == article_id:
            self.log_test("Get Article Detail", True)
            return data
        else:
            self.log_test("Get Article Detail", False, f"Failed to get article: {data}")
            return None

    def test_update_article(self, article_id: str):
        """Test updating an article"""
        if not article_id or not self.token:
            self.log_test("Update Article", False, "Missing article ID or token")
            return False
            
        update_data = {
            "title": f"Updated Test Article {datetime.now().strftime('%H%M%S')}",
            "published": True
        }
        
        success, data = self.make_request('PUT', f'/api/articles/{article_id}', update_data)
        
        if success:
            self.log_test("Update Article", True)
            return True
        else:
            self.log_test("Update Article", False, f"Failed to update article: {data}")
            return False

    def test_like_article(self, article_id: str):
        """Test liking an article (anonymous)"""
        if not article_id:
            self.log_test("Like Article", False, "No article ID provided")
            return False
            
        # Remove auth token for anonymous like
        temp_token = self.token
        self.token = None
        
        success, data = self.make_request('POST', f'/api/articles/{article_id}/like')
        
        # Restore token
        self.token = temp_token
        
        if success and 'liked' in data and 'likes_count' in data:
            self.log_test("Like Article", True)
            return data
        else:
            self.log_test("Like Article", False, f"Failed to like article: {data}")
            return False

    def test_add_comment(self, article_id: str):
        """Test adding a comment (anonymous)"""
        if not article_id:
            self.log_test("Add Comment", False, "No article ID provided")
            return False
            
        comment_data = {
            "author_name": "Test User",
            "content": "This is a test comment for the blog article."
        }
        
        # Remove auth token for anonymous comment
        temp_token = self.token
        self.token = None
        
        success, data = self.make_request('POST', f'/api/articles/{article_id}/comments', comment_data, 201)
        
        # Restore token
        self.token = temp_token
        
        if success and 'id' in data:
            self.log_test("Add Comment", True)
            return data
        else:
            self.log_test("Add Comment", False, f"Failed to add comment: {data}")
            return False

    def test_search_articles(self):
        """Test article search functionality"""
        search_params = "?search=test"
        success, data = self.make_request('GET', f'/api/articles{search_params}')
        
        if success and 'articles' in data:
            self.log_test("Search Articles", True)
            return data['articles']
        else:
            self.log_test("Search Articles", False, f"Failed to search articles: {data}")
            return []

    def test_filter_by_category(self):
        """Test filtering articles by category"""
        category_params = "?category=Actualités"
        success, data = self.make_request('GET', f'/api/articles{category_params}')
        
        if success and 'articles' in data:
            self.log_test("Filter by Category", True)
            return data['articles']
        else:
            self.log_test("Filter by Category", False, f"Failed to filter by category: {data}")
            return []

    def test_filter_by_tag(self):
        """Test filtering articles by tag"""
        tag_params = "?tag=test"
        success, data = self.make_request('GET', f'/api/articles{tag_params}')
        
        if success and 'articles' in data:
            self.log_test("Filter by Tag", True)
            return data['articles']
        else:
            self.log_test("Filter by Tag", False, f"Failed to filter by tag: {data}")
            return []

    def test_get_tags(self):
        """Test getting popular tags"""
        success, data = self.make_request('GET', '/api/tags')
        
        if success and isinstance(data, list):
            self.log_test("Get Tags", True)
            return data
        else:
            self.log_test("Get Tags", False, f"Failed to get tags: {data}")
            return []

    def test_admin_logout(self):
        """Test admin logout"""
        if not self.token:
            self.log_test("Admin Logout", False, "No token to logout")
            return False
            
        success, data = self.make_request('POST', '/api/auth/logout')
        
        if success:
            self.token = None
            self.admin_user = None
            self.log_test("Admin Logout", True)
            return True
        else:
            self.log_test("Admin Logout", False, f"Failed to logout: {data}")
            return False

    def test_delete_article(self, article_id: str):
        """Test deleting an article (requires re-login)"""
        if not article_id:
            self.log_test("Delete Article", False, "No article ID provided")
            return False
            
        # Re-login for delete operation
        if not self.test_admin_login():
            return False
            
        success, data = self.make_request('DELETE', f'/api/articles/{article_id}')
        
        if success:
            self.log_test("Delete Article", True)
            return True
        else:
            self.log_test("Delete Article", False, f"Failed to delete article: {data}")
            return False

    def cleanup(self):
        """Clean up created test articles"""
        if self.created_articles and self.token:
            print(f"\n🧹 Cleaning up {len(self.created_articles)} test articles...")
            for article_id in self.created_articles:
                self.test_delete_article(article_id)

    def run_all_tests(self):
        """Run the complete test suite"""
        print("🚀 Starting CONSTELLATION Blog API Tests...\n")
        
        # Basic connectivity
        self.test_health_check()
        
        # Authentication tests
        if not self.test_admin_login():
            print("❌ Cannot proceed without admin authentication")
            return False
            
        self.test_admin_me()
        
        # Categories and tags
        categories = self.test_get_categories()
        tags = self.test_get_tags()
        
        # Article CRUD operations
        article_id = self.test_create_article()
        articles = self.test_get_articles()
        
        if article_id:
            # Test article operations
            article_detail = self.test_get_article_detail(article_id)
            self.test_update_article(article_id)
            
            # Test anonymous interactions
            like_result = self.test_like_article(article_id)
            comment_result = self.test_add_comment(article_id)
            
            # Test search and filtering
            self.test_search_articles()
            self.test_filter_by_category()
            self.test_filter_by_tag()
        
        # Authentication cleanup
        self.test_admin_logout()
        
        # Cleanup test data
        self.cleanup()
        
        # Print results
        print(f"\n📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return False

def main():
    """Main test execution"""
    tester = ConstellationBlogTester()
    
    try:
        success = tester.run_all_tests()
        return 0 if success else 1
    except KeyboardInterrupt:
        print("\n⏹️  Tests interrupted by user")
        return 1
    except Exception as e:
        print(f"\n💥 Test suite crashed: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())